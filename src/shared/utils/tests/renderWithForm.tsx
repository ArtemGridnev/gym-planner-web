import { FormProvider, useForm } from "react-hook-form";
import { render } from "@testing-library/react";

export function renderWithForm(
  ui: React.ReactElement,
  {
    defaultValues,
    formOptions,
  }: {
    defaultValues?: Record<string, any>;
    formOptions?: Parameters<typeof useForm>[0];
  } = {}
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm({
      defaultValues,
      ...formOptions,
    });

    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return render(ui, { wrapper: Wrapper });
}