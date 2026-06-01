declare module 'trainingSessions/CurrentSessionWidget' {
  import type React from 'react';
  import type { QueryClient } from '@tanstack/react-query';

  export type CurrentSessionWidgetProps = {
    onExerciseClick?: (exerciseId: string) => void;
  };

  export type CurrentSessionWidgetRootProps = CurrentSessionWidgetProps & {
    queryClient: QueryClient;
  };

  export const CurrentSessionWidget: React.ComponentType<CurrentSessionWidgetProps>;
  const _default: React.ComponentType<CurrentSessionWidgetRootProps>;
  export default _default;
}
