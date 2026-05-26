import { codeBlock } from '@/lib/blog-code-block'

export const laravelBrevoBlogContentEn = `
<div class="space-y-6">
  <div class="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
    <p><strong>Why API Key instead of SMTP?</strong> Many shared hosting or cloud servers block SMTP ports (587, 465, 25) for security. Brevo's API-based mailer works entirely over HTTPS (port 443) — so port restrictions don't matter. API keys are also more secure because no password is sent over the wire. On Brevo's free plan you can send <strong>300 emails per day</strong> at no cost.</p>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-3 gap-3 my-8">
    <div class="rounded-xl border border-border/50 bg-card/50 p-4"><p class="text-xs font-mono text-emerald-500 font-bold mb-2">01</p><h4 class="font-semibold text-sm mb-1">Package Install</h4><p class="text-sm text-muted-foreground">Add Brevo mailer and HTTP client via Composer</p></div>
    <div class="rounded-xl border border-border/50 bg-card/50 p-4"><p class="text-xs font-mono text-emerald-500 font-bold mb-2">02</p><h4 class="font-semibold text-sm mb-1">.env Config</h4><p class="text-sm text-muted-foreground">Set API key and mail settings</p></div>
    <div class="rounded-xl border border-border/50 bg-card/50 p-4"><p class="text-xs font-mono text-emerald-500 font-bold mb-2">03</p><h4 class="font-semibold text-sm mb-1">Services Setup</h4><p class="text-sm text-muted-foreground">Add Brevo entry in config/services.php</p></div>
    <div class="rounded-xl border border-border/50 bg-card/50 p-4"><p class="text-xs font-mono text-emerald-500 font-bold mb-2">04</p><h4 class="font-semibold text-sm mb-1">Provider Bind</h4><p class="text-sm text-muted-foreground">Register transport in AppServiceProvider</p></div>
    <div class="rounded-xl border border-border/50 bg-card/50 p-4"><p class="text-xs font-mono text-emerald-500 font-bold mb-2">05</p><h4 class="font-semibold text-sm mb-1">Mail Config</h4><p class="text-sm text-muted-foreground">Add mailer in config/mail.php</p></div>
    <div class="rounded-xl border border-border/50 bg-card/50 p-4"><p class="text-xs font-mono text-emerald-500 font-bold mb-2">06</p><h4 class="font-semibold text-sm mb-1">Test &amp; Done</h4><p class="text-sm text-muted-foreground">Test via Tinker or a Route</p></div>
  </div>

  <hr class="border-border/50 my-10" />

  <h2><span class="step-badge">Step 01</span> Package Install</h2>
  <p>Brevo uses Symfony's official mailer bridge, which talks to the Brevo API. You also need <strong>symfony/http-client</strong> for API calls.</p>
  ${codeBlock('Terminal', 'bash', 'composer require symfony/brevo-mailer symfony/http-client')}
  <div class="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 my-4">
    <p><strong>Laravel version note:</strong> These packages work out of the box on Laravel 10+. On Laravel 9, check <code>symfony/mailer</code> version compatibility.</p>
  </div>

  <h2><span class="step-badge">Step 02</span> Configure .env</h2>
  <p>In the Brevo dashboard, go to <strong>SMTP &amp; API → API Keys</strong> and create an API key. Then set your <code>.env</code> like this:</p>
  ${codeBlock('.env', 'env', `# Mail driver — uses brevo API transport
MAIL_MAILER=brevo

# From Brevo dashboard > SMTP & API > API Keys
BREVO_API_KEY=your_actual_api_key_here

# Sender address — must be verified in Brevo
MAIL_FROM_ADDRESS=hello@yourdomain.com
MAIL_FROM_NAME="Your Company Name"`)}
  <div class="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 my-4">
    <p><strong>Important:</strong> The email in <code>MAIL_FROM_ADDRESS</code> must be <strong>verified as a Sender</strong> in Brevo. Otherwise Brevo will reject the mail. Verify under Dashboard &gt; Senders &amp; IP &gt; Senders.</p>
  </div>

  <h2><span class="step-badge">Step 03</span> config/services.php</h2>
  <p>Tell Laravel where Brevo config lives. Add a Brevo entry to the array in <code>config/services.php</code>:</p>
  ${codeBlock('config/services.php', 'php', `return [

    // ... other services (mailgun, postmark, etc.) ...

    'brevo' => [
        'key' => env('BREVO_API_KEY'),
        'dsn' => 'brevo+api://' . env('BREVO_API_KEY') . '@default',
    ],

];`)}

  <h2><span class="step-badge">Step 04</span> AppServiceProvider — Register Transport</h2>
  <p>This is the most important step. Register a custom transport driver named <code>brevo</code> in Laravel's mail system inside the <code>boot()</code> method:</p>
  ${codeBlock('app/Providers/AppServiceProvider.php', 'php', `namespace App\\Providers;

use Illuminate\\Support\\ServiceProvider;
use Illuminate\\Support\\Facades\\Mail;
use Symfony\\Component\\Mailer\\Bridge\\Brevo\\Transport\\BrevoTransportFactory;
use Symfony\\Component\\Mailer\\Transport\\Dsn;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Mail::extend('brevo', function () {
            $config = $this->app['config']->get('services.brevo', []);

            return (new BrevoTransportFactory())->create(
                new Dsn(
                    'brevo+api',
                    'default',
                    $config['key']
                )
            );
        });
    }
}`)}
  <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 my-4">
    <p><strong>How it works:</strong> <code>Mail::extend()</code> adds a new driver to Laravel's mail manager. When <code>MAIL_MAILER=brevo</code>, Laravel calls this callback and Symfony's <code>BrevoTransportFactory</code> builds a transport that talks to Brevo's API over HTTPS.</p>
  </div>

  <h2><span class="step-badge">Step 05</span> Add Mailer in config/mail.php</h2>
  <p>Add a <code>brevo</code> entry to the <code>mailers</code> array in <code>config/mail.php</code>. This tells Laravel which transport the <strong>brevo</strong> mailer uses:</p>
  ${codeBlock('config/mail.php', 'php', `'mailers' => [

    'smtp' => [
        'transport' => 'smtp',
        // ... smtp settings ...
    ],

    'brevo' => [
        'transport' => 'brevo', // must match the name in Mail::extend()
    ],

    // ... other mailers ...

],`)}

  <h2><span class="step-badge">Step 06</span> Test It</h2>
  <div class="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 my-4">
    <p>Before testing, always run <code>php artisan config:clear</code>! If cached config is loaded, new settings won't apply.</p>
  </div>

  <h3>Method A — Artisan Tinker (fastest)</h3>
  <p>Open Tinker in the terminal and send a test email:</p>
  ${codeBlock('Terminal', 'bash', 'php artisan tinker')}
  ${codeBlock('Tinker REPL', 'php', `use Illuminate\\Support\\Facades\\Mail;

Mail::raw('Hello from Brevo API! This is a test.', function ($message) {
    $message->to('your@email.com')
            ->subject('Laravel Brevo API Test');
});`)}

  <h3>Method B — Web Route (browser test)</h3>
  <p>Add this route to <code>routes/web.php</code>, then open <code>http://127.0.0.1:8000/send-test-mail</code> in your browser. On success you'll get a JSON response:</p>
  ${codeBlock('routes/web.php', 'php', `use Illuminate\\Support\\Facades\\Mail;
use Illuminate\\Support\\Facades\\Route;

Route::get('/send-test-mail', function () {
    try {
        $to = 'your@email.com';

        Mail::raw(
            'Test mail from Laravel + Brevo API. Time: ' . now(),
            function ($message) use ($to) {
                $message->to($to)
                        ->subject('Laravel Brevo Test — ' . now());
            }
        );

        return response()->json([
            'status'  => 'success',
            'message' => 'Email sent to ' . $to,
            'time'    => now()->toDateTimeString(),
        ], 200);

    } catch (\\Exception $e) {
        return response()->json([
            'status' => 'failed',
            'error'  => $e->getMessage(),
        ], 500);
    }
});`)}
  <div class="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 my-4">
    <p><strong>Do not keep this route in production.</strong> Remove it after testing or protect it with middleware.</p>
  </div>

  <hr class="border-border/50 my-10" />

  <h2>Why choose Brevo API?</h2>
  <div class="grid md:grid-cols-2 gap-4 my-6">
    <div class="rounded-lg border border-border/50 bg-card/50 p-4">
      <h4 class="font-semibold text-sm mb-1">No SMTP restrictions</h4>
      <p class="text-sm text-muted-foreground">Works over HTTPS (port 443) on any server</p>
    </div>
    <div class="rounded-lg border border-border/50 bg-card/50 p-4">
      <h4 class="font-semibold text-sm mb-1">300 emails/day free</h4>
      <p class="text-sm text-muted-foreground">Start without a credit card — enough for small projects</p>
    </div>
    <div class="rounded-lg border border-border/50 bg-card/50 p-4">
      <h4 class="font-semibold text-sm mb-1">Delivery analytics</h4>
      <p class="text-sm text-muted-foreground">Opens, bounces, and spam reports in the Brevo dashboard</p>
    </div>
    <div class="rounded-lg border border-border/50 bg-card/50 p-4">
      <h4 class="font-semibold text-sm mb-1">More secure</h4>
      <p class="text-sm text-muted-foreground">API key stays in .env — no SMTP password exposure</p>
    </div>
    <div class="rounded-lg border border-border/50 bg-card/50 p-4">
      <h4 class="font-semibold text-sm mb-1">Fast delivery</h4>
      <p class="text-sm text-muted-foreground">Brevo's warmed IPs help reach the inbox, not spam</p>
    </div>
    <div class="rounded-lg border border-border/50 bg-card/50 p-4">
      <h4 class="font-semibold text-sm mb-1">Scalable</h4>
      <p class="text-sm text-muted-foreground">Upgrade to a paid plan easily — thousands of emails per day</p>
    </div>
  </div>

  <hr class="border-border/50 my-10" />

  <p class="text-xs font-mono uppercase tracking-wider text-red-500 border border-red-500/25 bg-red-500/10 rounded-full inline-block px-3 py-1 mb-3">YouTube Tutorial</p>
  <h2>Watch the video tutorial</h2>
  <p>Watch the full live setup process in the video below.</p>
  <div class="video-embed">
    <iframe src="https://www.youtube.com/embed/d9Ah0ucJ6zo" title="Laravel + Brevo API Email Setup" allowfullscreen></iframe>
  </div>

  <div class="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 my-8">
    <h3 class="font-bold text-lg mb-3">Quick recap</h3>
    <p class="mb-4">Touch only five files and you can send email from Laravel via the Brevo API. After config changes, don't forget to run <strong>config:clear</strong>.</p>
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
      <span class="flow-step">done</span>
    </p>
  </div>
</div>
`.trim()
