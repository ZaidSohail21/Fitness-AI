// src/hooks/useExercises.ts
"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const API_URL = '/api/exercises';

export function useExercises(params?: Record<string, any>) {
  return useQuery({
    queryKey: ['exercises', params],
    queryFn: async () => {
      const qs = new URLSearchParams(params as any).toString();
      const res = await fetch(`${API_URL}?${qs}`);
      if (!res.ok) throw new Error('Failed to fetch exercises');
      return res.json();
    },
  });
}

export function useCreateExercise() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Create failed');
      return res.json();
    },
    onSuccess: () => {
      toast.success('Exercise created');
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
    onError: (err: any) => toast.error(err.message || 'Error'),
  });
}

export function useUpdateExercise() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await fetch(`${API_URL}?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Update failed');
      return res.json();
    },
    onSuccess: () => {
      toast.success('Exercise updated');
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
    onError: (err: any) => toast.error(err.message || 'Error'),
  });
}

export function useDeleteExercise() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      return res.json();
    },
    onSuccess: () => {
      toast.success('Exercise deleted');
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
    onError: (err: any) => toast.error(err.message || 'Error'),
  });
}
