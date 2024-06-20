<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

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
        Inertia::share([
            'dashboardImageUrl' => asset('images/3dpapers.png'),
            'logingirljump' => asset('images/girljumping.png'),
            'loginRocket' => asset('images/login-rocket.png'),
            'loginWoman' => asset('images/login-woman.png'),
            'loginPeople' => asset('images/login-3people.png'),
            'designer' => asset('images/Designer.png'),
            'desktop7' => asset('images/desktop7.png'),
            'desktop6' => asset('images/dashboard6.png'),

        ]);
    }
}
