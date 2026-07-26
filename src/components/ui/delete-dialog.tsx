'use client';

import * as React from 'react';
import { Modal } from './modal';
import { Button } from './button';
import { AlertTriangle } from 'lucide-react';

export interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export function DeleteDialog({
  isOpen,
  onClose,
  onDelete,
  title = 'Delete Item',
  description = 'Are you sure you want to delete this item? This action cannot be undone.',
  isLoading = false,
}: DeleteDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex items-start space-x-3 mb-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <p className="text-sm text-slate-300 pt-2">{description}</p>
      </div>
      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onDelete} isLoading={isLoading}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}
