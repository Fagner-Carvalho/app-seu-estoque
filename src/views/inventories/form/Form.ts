import * as yup from 'yup';

export const wrapValidation: any = (object: any) => yup.object().shape(object);

export const INVENTORY_MOVEMENTS_FORM = {
  VALUES: {
    item_id: '',
    item_name: '',
    supplier_id: '',
    supplier_name: '',
    type_Moviment: '',
    quantity: null,
    unit_price: null,
    total_price: 0,
  },
  VALIDATION: {
    item_id: yup.string().required('Este campo é obrigatório.'),
    supplier_id: yup.string().required('Este campo é obrigatório.'),
    type_Moviment: yup.string().required('Este campo é obrigatório.'),
    quantity: yup.number().nullable().required('Este campo é obrigatório.'),
    unit_price: yup.number().nullable().required('Este campo é obrigatório.'),
  },
};

export const FORM_VALUES = {
  ...INVENTORY_MOVEMENTS_FORM.VALUES,
};

export const FORM_VALIDATION = wrapValidation({
  ...INVENTORY_MOVEMENTS_FORM.VALIDATION,
});
