<?php

namespace App\Observers;

use App\Services\AuditService;

/**
 * AuditObserver — satu observer untuk semua model yang perlu diaudit.
 * Daftarkan ke setiap model di AppServiceProvider::boot().
 */
class AuditObserver
{
    public function created($model): void
    {
        AuditService::logCreated(
            class_basename($model),
            $model->id,
            $model->getAttributes()
        );
    }

    public function updated($model): void
    {
        AuditService::logUpdated(
            class_basename($model),
            $model->id,
            $model->getOriginal(),
            $model->getChanges()
        );
    }

    public function deleted($model): void
    {
        AuditService::logDeleted(
            class_basename($model),
            $model->id,
            $model->getAttributes()
        );
    }
}