import * as yup from 'yup';

export const wrapValidation: any = (object: any) => yup.object().shape(object);

export const UNIT_MEASURE_FORM = {
  VALUES: {
    name: '',
    abbreviation: '',
  },
  VALIDATION: {
    name: yup.string().required('Este campo é obrigatório.'),
    abbreviation: yup.string().required('Este campo é obrigatório.'),
  },
};

export const FORM_VALUES = {
  ...UNIT_MEASURE_FORM.VALUES,
};

export const FORM_VALIDATION = wrapValidation({
  ...UNIT_MEASURE_FORM.VALIDATION,
});
