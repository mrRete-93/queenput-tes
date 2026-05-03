<?php

namespace App\Observers;

use App\Models\AppGuest;
use App\Services\AuditService;

class AppGuestObserver
{
    public function created(AppGuest $appGuest): void
    {
        AuditService::logCreated(
            class_basename($appGuest),
            $appGuest->id,
            $appGuest->getAttributes()
        );
    }

    public function updated(AppGuest $appGuest): void
    {
        AuditService::logUpdated(
            class_basename($appGuest),
            $appGuest->id,
            $appGuest->getOriginal(),
            $appGuest->getChanges()
        );
    }

    public function deleted(AppGuest $appGuest): void
    {
        AuditService::logDeleted(
            class_basename($appGuest),
            $appGuest->id,
            $appGuest->getAttributes()
        );
    }
}