<?php

namespace App\Observers;

use App\Models\Guest;
use App\Services\AuditService;

class GuestObserver
{
    public function created(Guest $guest): void
    {
        AuditService::logCreated(
            class_basename($guest),
            $guest->id,
            $guest->getAttributes()
        );
    }

    public function updated(Guest $guest): void
    {
        AuditService::logUpdated(
            class_basename($guest),
            $guest->id,
            $guest->getOriginal(),
            $guest->getChanges()
        );
    }

    public function deleted(Guest $guest): void
    {
        AuditService::logDeleted(
            class_basename($guest),
            $guest->id,
            $guest->getAttributes()
        );
    }
}