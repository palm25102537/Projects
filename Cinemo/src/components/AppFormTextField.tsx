import {
  FormControl,
  FormHelperText,
  InputLabel,
  InputProps,
  OutlinedInput,
} from "@mui/material";
import { FC, PropsWithChildren, forwardRef, useMemo } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface Props extends InputProps, PropsWithChildren {
  label?: string;
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  helperText?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export const AppFormTextField: FC<Props> = forwardRef(function AppFormTextField(
  props,
  ref
) {
  const {
    label,
    errorMessage,
    required,
    sx,
    disabled,
    helperText,
    ...inputProps
  } = props;
  const hasError = useMemo(() => {
    return !!errorMessage;
  }, [errorMessage]);

  return (
    <>
      <FormControl
        error={hasError}
        disabled={disabled}
        sx={{ ...sx, "input.Mui-disabled": { backgroundColor: "#f5f5f5" } }}
      >
        <InputLabel required={required ?? true}>{label}</InputLabel>
        <OutlinedInput
          ref={ref}
          error={hasError}
          {...inputProps}
          label={label}
        />
        <FormHelperText error={false}>{helperText as string}</FormHelperText>
        <FormHelperText>{errorMessage as string}</FormHelperText>
      </FormControl>
    </>
  );
});
