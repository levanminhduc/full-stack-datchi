import { useState, useEffect } from 'react';
import { getEmployees } from '../api';
import type { Employee } from '../types';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEmployees(100);
      setEmployees(data.rows);
    } catch (err) {
      setError('Error loading employees');
      console.error('Error loading employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = (id: number) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
    deleteEmployee,
    refreshEmployees: loadEmployees,
  };
};

