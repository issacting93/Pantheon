import './TraitIndicator.css';

interface TraitIndicatorProps {
  className?: string;
}

export function TraitIndicator({ className }: TraitIndicatorProps) {
  return (
    <div className={`trait-indicator${className ? ` ${className}` : ''}`}>
      
    </div>
  );
}
