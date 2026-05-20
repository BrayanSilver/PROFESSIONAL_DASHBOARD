export function ApiError({ message }: { message: string }) {
  return (
    <div className="glass-card border-accent-red/30 p-6 text-center">
      <p className="text-accent-red font-medium">Erro ao carregar dados</p>
      <p className="mt-2 text-sm text-slate-400">{message}</p>
      <p className="mt-4 text-xs text-slate-500">
        Certifique-se de que o backend NestJS está rodando em{' '}
        <code className="rounded bg-surface-hover px-1.5 py-0.5">
          http://localhost:3002
        </code>
      </p>
    </div>
  );
}
