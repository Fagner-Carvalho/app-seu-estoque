import * as yup from 'yup';

export const wrapValidation: any = (object: any) => yup.object().shape(object);

export const SUPPLIER_FORM = {
  VALUES: {
    name: '',
    cnpj: '',
    email: '',
    phone: '',
  },
  VALIDATION: {
    name: yup.string().required('Este campo é obrigatório.'),
    cnpj: yup.string().required('Este campo é obrigatório.'),
    email: yup.string().email('Email inválido!'),
  },
};

export const FORM_VALUES = {
  ...SUPPLIER_FORM.VALUES,
};

export const FORM_VALIDATION = wrapValidation({
  ...SUPPLIER_FORM.VALIDATION,
});
