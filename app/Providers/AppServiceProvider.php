<?php

namespace App\Providers;

use App\Models\Guest;
use App\Models\AppGuest;
use App\Observers\GuestObserver;
use App\Observers\AppGuestObserver;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
{
    // Tambah ini
    if (config('app.env') === 'production') {
        URL::forceScheme('https');
    }

    // ── Daftarkan Observer ────────────────────────────────────────────────
    Guest::observe(GuestObserver::class);
    AppGuest::observe(AppGuestObserver::class);

    // ── Rate Limiting ─────────────────────────────────────────────────────
    $this->configureRateLimiting();
}

    protected function configureRateLimiting(): void
    {
        RateLimiter::for('tamu', function (Request $request) {
            return $request->user()
                ? Limit::perMinute(200)->by($request->user()->id)
                : Limit::perMinute(30)->by($request->ip());
        });

        RateLimiter::for('admin-umum', function (Request $request) {
            return Limit::perMinute(120)->by($request->user()?->id ?? $request->ip());
        });

        RateLimiter::for('admin-tulis', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?? $request->ip());
        });

        RateLimiter::for('keuangan', function (Request $request) {
            return Limit::perMinute(30)->by($request->user()?->id ?? $request->ip());
        });

        RateLimiter::for('audit', function (Request $request) {
            return Limit::perMinute(30)->by($request->user()?->id ?? $request->ip());
        });

        RateLimiter::for('audit-export', function (Request $request) {
            return Limit::perMinute(5)->by($request->user()?->id ?? $request->ip());
        });
    }
}