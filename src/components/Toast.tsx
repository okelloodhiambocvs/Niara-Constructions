import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  toast: {
    success: (message: string, title?: string, duration?: number) => void;
    error: (message: string, title?: string, duration?: number) => void;
    info: (message: string, title?: string, duration?: number) => void;
  };
  remove: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.toast;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((type: ToastType, message: string, title?: string, duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = {
    success: (message: string, title?: string, duration?: number) => addToast('success', message, title || 'Success', duration),
    error: (message: string, title?: string, duration?: number) => addToast('error', message, title || 'Notice', duration),
    info: (message: string, title?: string, duration?: number) => addToast('info', message, title || 'Information', duration),
  };

  return (
    <ToastContext.Provider value={{ toast, remove }}>
      {children}
      <ToastContainer toasts={toasts} remove={remove} />
    </ToastContext.Provider>
  );
}

interface ToastContainerProps {
  toasts: ToastItem[];
  remove: (id: string) => void;
}

function ToastContainer({ toasts, remove }: ToastContainerProps) {
  return (
    <div 
      className="fixed z-50 bottom-5 right-5 left-5 md:left-auto flex flex-col gap-3 max-w-md pointer-events-none"
      id="toast-container"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((item) => (
          <ToastCard key={item.id} item={item} onDismiss={() => remove(item.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastCardProps {
  item: ToastItem;
  onDismiss: () => void;
}

function ToastCard({ item, onDismiss }: ToastCardProps) {
  const { type, title, message, duration } = item;

  React.useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  const styleConfig = {
    success: {
      border: 'border-l-4 border-l-brand-accent border-brand-accent/20',
      icon: <CheckCircle2 className="text-brand-accent flex-shrink-0" size={20} />,
      bg: 'bg-brand-primary text-white/90',
    },
    error: {
      border: 'border-l-4 border-l-rose-500 border-rose-500/20',
      icon: <AlertCircle className="text-rose-500 flex-shrink-0" size={20} />,
      bg: 'bg-brand-primary text-white/90',
    },
    info: {
      border: 'border-l-4 border-l-sky-500 border-sky-500/20',
      icon: <Info className="text-sky-500 flex-shrink-0" size={20} />,
      bg: 'bg-brand-primary text-white/90',
    },
  };

  const config = styleConfig[type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      whileHover={{ y: -2 }}
      className={`pointer-events-auto flex items-start gap-4 p-5 rounded px-6 shadow-2xl border ${config.border} ${config.bg} backdrop-blur-md relative overflow-hidden`}
    >
      <div className="mt-0.5">{config.icon}</div>
      <div className="flex-1 min-w-0 pr-4">
        {title && (
          <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-accent mb-1.5 label-brand">
            {title}
          </h4>
        )}
        <p className="text-xs text-white/80 leading-relaxed font-sans">{message}</p>
      </div>
      <button 
        onClick={onDismiss}
        className="text-white/30 hover:text-brand-accent transition-colors p-1 rounded-full hover:bg-white/5"
        aria-label="Dismiss message"
      >
        <X size={14} />
      </button>

      {/* Progress timer indicator */}
      {duration && (
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-brand-accent/25"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
        />
      )}
    </motion.div>
  );
}
