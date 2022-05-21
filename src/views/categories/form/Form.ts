import * as yup from 'yup';

export const wrapValidation: any = (object: any) => yup.object().shape(object);

export const CATEGORY_FORM = {
  VALUES: {
    name: '',
    description: '',
  },
  VALIDATION: {
    name: yup.string().required('Este campo é obrigatório.'),
  },
};

export const FORM_VALUES = {
  ...CATEGORY_FORM.VALUES,
};

export const FORM_VALIDATION = wrapValidation({
  ...CATEGORY_FORM.VALIDATION,
});
