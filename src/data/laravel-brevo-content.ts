import { codeBlock } from '@/lib/blog-code-block'

export const laravelBrevoBlogContentBn = `
<div class="space-y-6">
  <div class="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
    <p><strong>কেন SMTP-র বদলে API Key?</strong> অনেক shared hosting বা cloud server-এ SMTP port (587, 465, 25) ব্লক থাকে security কারণে। Brevo-র API-based mailer সম্পূর্ণ HTTPS (port 443) দিয়ে কাজ করে — তাই কোনো port restriction ম্যাটার করে না। এছাড়া API key অনেক বেশি secure, কারণ password কোথাও যায় না। Brevo free plan-এ প্রতিদিন <strong>৩০০টি email</strong> সম্পূর্ণ বিনামূল্যে পাঠানো যায়।</p>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-3 gap-3 my-8">
    <div class="rounded-xl border border-border/50 bg-card/50 p-4"><p class="text-xs font-mono text-emerald-500 font-bold mb-2">01</p><h4 class="font-semibold text-sm mb-1">Package Install</h4><p class="text-sm text-muted-foreground">Brevo mailer ও HTTP client composer দিয়ে যোগ</p></div>
    <div class="rounded-xl border border-border/50 bg-card/50 p-4"><p class="text-xs font-mono text-emerald-500 font-bold mb-2">02</p><h4 class="font-semibold text-sm mb-1">.env Config</h4><p class="text-sm text-muted-foreground">API key ও mail settings সেট করা</p></div>
    <div class="rounded-xl border border-border/50 bg-card/50 p-4"><p class="text-xs font-mono text-emerald-500 font-bold mb-2">03</p><h4 class="font-semibold text-sm mb-1">Services Setup</h4><p class="text-sm text-muted-foreground">config/services.php এ Brevo entry</p></div>
    <div class="rounded-xl border border-border/50 bg-card/50 p-4"><p class="text-xs font-mono text-emerald-500 font-bold mb-2">04</p><h4 class="font-semibold text-sm mb-1">Provider Bind</h4><p class="text-sm text-muted-foreground">AppServiceProvider-এ transport register</p></div>
    <div class="rounded-xl border border-border/50 bg-card/50 p-4"><p class="text-xs font-mono text-emerald-500 font-bold mb-2">05</p><h4 class="font-semibold text-sm mb-1">Mail Config</h4><p class="text-sm text-muted-foreground">config/mail.php তে mailer যোগ</p></div>
    <div class="rounded-xl border border-border/50 bg-card/50 p-4"><p class="text-xs font-mono text-emerald-500 font-bold mb-2">06</p><h4 class="font-semibold text-sm mb-1">Test &amp; Done</h4><p class="text-sm text-muted-foreground">Tinker বা Route দিয়ে পরীক্ষা</p></div>
  </div>

  <hr class="border-border/50 my-10" />

  <h2><span class="step-badge">ধাপ ০১</span> Package Install</h2>
  <p>Brevo-র জন্য Symfony-র official mailer bridge ব্যবহার করা হয়। এই bridge-টি Brevo-র API-এর সাথে কথা বলে। সাথে <strong>symfony/http-client</strong> লাগবে কারণ API call করার জন্য এটা দরকার।</p>
  ${codeBlock('Terminal', 'bash', 'composer require symfony/brevo-mailer symfony/http-client')}
  <div class="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 my-4">
    <p><strong>Laravel version note:</strong> Laravel 10+ এ এই package গুলো সরাসরি কাজ করে। Laravel 9 হলে <code>symfony/mailer</code> version compatibility চেক করো।</p>
  </div>

  <h2><span class="step-badge">ধাপ ০২</span> .env ফাইল কনফিগার</h2>
  <p>Brevo dashboard-এ গিয়ে <strong>SMTP &amp; API → API Keys</strong> থেকে একটি API key তৈরি করো। তারপর <code>.env</code> ফাইলে নিচের মতো সেট করো:</p>
  ${codeBlock('.env', 'env', `# Mail driver — brevo API transport ব্যবহার করবে
MAIL_MAILER=brevo

# Brevo dashboard > SMTP & API > API Keys থেকে নাও
BREVO_API_KEY=your_actual_api_key_here

# যে address থেকে mail যাবে — Brevo-তে verified হতে হবে
MAIL_FROM_ADDRESS=hello@yourdomain.com
MAIL_FROM_NAME="Your Company Name"`)}
  <div class="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 my-4">
    <p><strong>গুরুত্বপূর্ণ:</strong> <code>MAIL_FROM_ADDRESS</code>-এ দেওয়া email টি Brevo-তে <strong>Sender হিসেবে verified</strong> থাকতে হবে। না হলে Brevo mail reject করবে। Dashboard &gt; Senders &amp; IP &gt; Senders থেকে verify করো।</p>
  </div>

  <h2><span class="step-badge">ধাপ ০৩</span> config/services.php</h2>
  <p>Laravel-কে জানাতে হবে Brevo-র config কোথায় আছে। <code>config/services.php</code> ফাইলের array-এ Brevo-র entry যোগ করো:</p>
  ${codeBlock('config/services.php', 'php', `return [

    // ... অন্যান্য services (mailgun, postmark ইত্যাদি) ...

    'brevo' => [
        'key' => env('BREVO_API_KEY'),
        'dsn' => 'brevo+api://' . env('BREVO_API_KEY') . '@default',
    ],

];`)}

  <h2><span class="step-badge">ধাপ ০৪</span> AppServiceProvider — Transport Register</h2>
  <p>এটাই সবচেয়ে গুরুত্বপূর্ণ ধাপ। Laravel-এর mail system-এ <code>brevo</code> নামের একটি custom transport driver register করতে হবে। এটা <code>boot()</code> method-এ করা হয়:</p>
  ${codeBlock('app/Providers/AppServiceProvider.php', 'php', `namespace App\\Providers;

use Illuminate\\Support\\ServiceProvider;
use Illuminate\\Support\\Facades\\Mail;
use Symfony\\Component\\Mailer\\Bridge\\Brevo\\Transport\\BrevoTransportFactory;
use Symfony\\Component\\Mailer\\Transport\\Dsn;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // register() খালি রাখা হয়েছে
    }

    public function boot(): void
    {
        // 'brevo' নামে custom mail transport register করা হচ্ছে।
        // config/mail.php এ 'transport' => 'brevo' দিলে এটি call হবে।
        Mail::extend('brevo', function () {
            $config = $this->app['config']->get('services.brevo', []);

            return (new BrevoTransportFactory())->create(
                new Dsn(
                    'brevo+api',    // scheme
                    'default',      // host (Brevo নিজেই handle করে)
                    $config['key']  // API key as user
                )
            );
        });
    }
}`)}
  <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 my-4">
    <p><strong>কীভাবে কাজ করে:</strong> <code>Mail::extend()</code> Laravel-এর mail manager-এ একটি নতুন driver যোগ করে। যখন <code>MAIL_MAILER=brevo</code> থাকে, Laravel এই callback call করে এবং Symfony-র <code>BrevoTransportFactory</code> একটি transport object তৈরি করে দেয় যা Brevo-র API-এর সাথে HTTPS-এ কথা বলে।</p>
  </div>

  <h2><span class="step-badge">ধাপ ০৫</span> config/mail.php তে Mailer যোগ</h2>
  <p><code>config/mail.php</code> ফাইলের <code>mailers</code> array-এ <code>brevo</code> entry যোগ করো। এটা Laravel-কে বলে যে <strong>'brevo'</strong> নামের mailer কোন transport ব্যবহার করবে:</p>
  ${codeBlock('config/mail.php', 'php', `'mailers' => [

    'smtp' => [
        'transport' => 'smtp',
        // ... smtp settings ...
    ],

    // ↓ এই entry টি যোগ করো
    'brevo' => [
        'transport' => 'brevo', // AppServiceProvider-এ extend() করা নামটাই এখানে দিতে হবে
    ],

    // ... অন্যান্য mailers ...

],`)}

  <h2><span class="step-badge">ধাপ ০৬</span> Test করো</h2>
  <div class="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 my-4">
    <p>Test করার আগে অবশ্যই <code>php artisan config:clear</code> চালাও! Cache থেকে পুরনো config লোড হলে নতুন settings কাজ করবে না।</p>
  </div>

  <h3>পদ্ধতি ক — Artisan Tinker দিয়ে (সবচেয়ে দ্রুত)</h3>
  <p>Terminal-এ Tinker খুলে সরাসরি mail পাঠিয়ে দেখো:</p>
  ${codeBlock('Terminal', 'bash', 'php artisan tinker')}
  ${codeBlock('Tinker REPL', 'php', `use Illuminate\\Support\\Facades\\Mail;

Mail::raw('Hello from Brevo API! This is a test.', function ($message) {
    $message->to('tomar@email.com')
            ->subject('Laravel Brevo API Test');
});`)}

  <h3>পদ্ধতি খ — Web Route দিয়ে (ব্রাউজারে পরীক্ষা)</h3>
  <p><code>routes/web.php</code>-এ নিচের route যোগ করো, তারপর ব্রাউজারে <code>http://127.0.0.1:8000/send-test-mail</code> খোলো। Success হলে JSON response পাবে:</p>
  ${codeBlock('routes/web.php', 'php', `use Illuminate\\Support\\Facades\\Mail;
use Illuminate\\Support\\Facades\\Route;

Route::get('/send-test-mail', function () {
    try {
        $to = 'tomar@email.com'; // এখানে তোমার email দাও

        Mail::raw(
            'Laravel + Brevo API থেকে test mail। সময়: ' . now(),
            function ($message) use ($to) {
                $message->to($to)
                        ->subject('Laravel Brevo Test — ' . now());
            }
        );

        return response()->json([
            'status'  => '✅ success',
            'message' => 'Email পাঠানো হয়েছে ' . $to . '-তে',
            'time'    => now()->toDateTimeString(),
        ], 200);

    } catch (\\Exception $e) {
        return response()->json([
            'status' => '❌ failed',
            'error'  => $e->getMessage(),
        ], 500);
    }
});`)}
  <div class="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 my-4">
    <p><strong>Production-এ এই route রাখবে না।</strong> Test শেষে অবশ্যই route টি remove করো অথবা middleware দিয়ে protect করো।</p>
  </div>

  <hr class="border-border/50 my-10" />

  <h2>কেন Brevo API বেছে নেবে?</h2>
  <div class="grid md:grid-cols-2 gap-4 my-6">
    <div class="rounded-lg border border-border/50 bg-card/50 p-4">
      <h4 class="font-semibold text-sm mb-1">SMTP Restriction নেই</h4>
      <p class="text-sm text-muted-foreground">HTTPS (port 443) দিয়ে কাজ করে — যেকোনো সার্ভারে চলে</p>
    </div>
    <div class="rounded-lg border border-border/50 bg-card/50 p-4">
      <h4 class="font-semibold text-sm mb-1">৩০০ ইমেইল/দিন ফ্রি</h4>
      <p class="text-sm text-muted-foreground">Credit card ছাড়াই শুরু করা যায়, ছোট project-এর জন্য যথেষ্ট</p>
    </div>
    <div class="rounded-lg border border-border/50 bg-card/50 p-4">
      <h4 class="font-semibold text-sm mb-1">Delivery Analytics</h4>
      <p class="text-sm text-muted-foreground">Opens, bounces, spam report সব Brevo dashboard-এ দেখা যায়</p>
    </div>
    <div class="rounded-lg border border-border/50 bg-card/50 p-4">
      <h4 class="font-semibold text-sm mb-1">বেশি নিরাপদ</h4>
      <p class="text-sm text-muted-foreground">API key env-এ থাকে, SMTP password expose হওয়ার ঝুঁকি নেই</p>
    </div>
    <div class="rounded-lg border border-border/50 bg-card/50 p-4">
      <h4 class="font-semibold text-sm mb-1">দ্রুত Delivery</h4>
      <p class="text-sm text-muted-foreground">Brevo-র নিজস্ব warm IP দিয়ে spam-এ না গিয়ে inbox-এ পৌঁছায়</p>
    </div>
    <div class="rounded-lg border border-border/50 bg-card/50 p-4">
      <h4 class="font-semibold text-sm mb-1">Scalable</h4>
      <p class="text-sm text-muted-foreground">দরকার হলে সহজেই paid plan-এ upgrade — হাজার হাজার mail/দিন</p>
    </div>
  </div>

  <hr class="border-border/50 my-10" />

  <p class="text-xs font-mono uppercase tracking-wider text-red-500 border border-red-500/25 bg-red-500/10 rounded-full inline-block px-3 py-1 mb-3">YouTube Tutorial</p>
  <h2>ভিডিও টিউটোরিয়াল দেখো</h2>
  <p>পুরো setup প্রক্রিয়াটি live দেখতে চাইলে নিচের ভিডিওটি দেখো।</p>
  <div class="video-embed">
    <iframe src="https://www.youtube.com/embed/w96LIYeIJ8k?start=95" title="Laravel + Brevo API Email Setup" allowfullscreen></iframe>
  </div>

  <div class="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 my-8">
    <h3 class="font-bold text-lg mb-3">সংক্ষেপে পুরো প্রক্রিয়া</h3>
    <p class="mb-4">মাত্র ৫টি ফাইল touch করলেই Laravel থেকে Brevo API দিয়ে email পাঠানো সম্পূর্ণ হয়ে যাবে। Config change-এর পর <strong>config:clear</strong> চালাতে ভুলো না।</p>
    <p class="flow-steps">
      <span class="flow-step">composer require</span>
      <span class="flow-arrow">→</span>
      <span class="flow-step">.env set</span>
      <span class="flow-arrow">→</span>
      <span class="flow-step">services.php</span>
      <span class="flow-arrow">→</span>
      <span class="flow-step">AppServiceProvider</span>
      <span class="flow-arrow">→</span>
      <span class="flow-step">mail.php</span>
      <span class="flow-arrow">→</span>
      <span class="flow-step">config:clear</span>
      <span class="flow-arrow">→</span>
      <span class="flow-step">✅ done</span>
    </p>
  </div>
</div>
`.trim()
