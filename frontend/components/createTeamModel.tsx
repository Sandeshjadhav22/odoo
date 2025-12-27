'use client';

import { useState } from 'react';
import Modal from './model';
import { createTeam } from '@/lib/api';

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateTeamModal({
  open,
  onClose,
  onCreated,
}: Props) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setError('');

    if (!name || !company) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      await createTeam({ name, company });
      onClose();
      onCreated(); // refresh teams
      setName('');
      setCompany('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      title="Create Team"
      onClose={onClose}
    >
      <div className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Team Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={loading}
            className="px-3 py-1.5 bg-black text-white rounded disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
