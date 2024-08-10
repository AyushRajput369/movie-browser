import { useSnackbar } from 'notistack';

// Define possible notification variants
const VARIANTS = ['default', 'error', 'success', 'warning', 'info'];

export const useCustomToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  // Function to show a toast message
  const showToast = (message, variant = 'default') => {
    if (!VARIANTS.includes(variant)) {
      console.warn(`Variant ${variant} is not recognized. Falling back to default.`);
      variant = 'default';
    }

    enqueueSnackbar(message, { variant });
  };

  return { showToast };
};
