<?php

namespace App\Providers;
use App\Models\Guest;
use App\Models\AppGuest;
use App\Observers\GuestObserver;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Guest::observe(GuestObserver::class);
        AppGuest::observe(GuestObserver::class);
    }
}
