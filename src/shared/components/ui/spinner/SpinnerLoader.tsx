import { useQuery } from '@tanstack/react-query';
import { Spinner } from './Spinner';

interface SpinnerLoaderProps {
  queryKey: any[];
  queryFn: () => Promise<any>;
  render: (data: any) => React.ReactNode;
  size?: 'small' | 'large';
  color?: 'primary' | 'secondary';
  className?: string;
  spinnerWrapperClassName?: string;
}

export function SpinnerLoader({
  queryKey,
  queryFn,
  render,
  size = 'small',
  color = 'primary',
  className = '',
  spinnerWrapperClassName = 'flex justify-center items-center p-4',
}: SpinnerLoaderProps) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey,
    queryFn,
  });

  const shouldShowSpinner = isLoading || isFetching;

  if (shouldShowSpinner) {
    return (
      <div className={spinnerWrapperClassName}>
        <Spinner size={size} color={color} className={className} />
      </div>
    );
  }

  return <>{render(data)}</>;
}
