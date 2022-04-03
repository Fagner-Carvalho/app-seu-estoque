import * as yup from 'yup';

export const wrapValidation: any = (object: any) => yup.object().shape(object);

export const ITEM_FORM = {
  VALUES: {
    name: '',
    category_id: '',
    category_name: '',
    unit_measure_id: '',
    unit_measure_name: '',
    minimum_inventory: 0,
    status: true,
  },
  VALIDATION: {
    name: yup.string().required('Este campo é obrigatório.'),
    category_id: yup.string().required('Este campo é obrigatório.'),
    unit_measure_id: yup.string().required('Este campo é obrigatório.'),
    minimum_inventory: yup.string().required('Este campo é obrigatório.'),
  },
};

export const FORM_VALUES = {
  ...ITEM_FORM.VALUES,
};

export const FORM_VALIDATION = wrapValidation({
  ...ITEM_FORM.VALIDATION,
});
