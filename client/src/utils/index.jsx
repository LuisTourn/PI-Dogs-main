const validateForm = (input) => {
  let errors = {};

  if (!input.name) {
    errors.name = 'Name is required';
  } else if (!/[A-ZÑ]+$/i.test(input.name)) {
    errors.name = 'Only letters are allowed';
  };

  // Weight validations
  if (!input.minWeight) {
    errors.minWeight = 'Minimun Weight is required'
  } else if (!/[0-9]+$/.test(input.minWeight)) {
    errors.minWeight = 'Only numbers are allowed'
  } else if (parseInt(input.minWeight) > parseInt(input.maxWeight)) {
    errors.minWeight = 'Minimum Weight can\'t be higher than Maximum Weight'
  } else if (parseInt(input.minWeight) < 1) {
    errors.minWeight = 'Minimum Weight can\'t be lower than 1 kg'
  };

  if (!input.maxWeight) {
    errors.maxWeight = 'Maximum Weight is required'
  } else if (!/[0-9]+$/.test(input.maxWeight)) {
    errors.maxWeight = 'Only numbers are allowed'
  } else if (parseInt(input.maxWeight) < parseInt(input.minWeight)) {
    errors.maxWeight = 'Maximum Weight can\'t be lower than Minimum Weight'
  } else if (parseInt(input.maxWeight) < 1) {
    errors.maxWeight = 'Maximum Weight can\'t be lower than 1 kg'
  };

  // Height validations
  if (!input.minHeight) {
    errors.minHeight = 'Minimun Height is required'
  } else if (!/[0-9]+$/.test(input.minHeight)) {
    errors.minHeight = 'Only numbers are allowed'
  } else if (parseInt(input.minHeight) > parseInt(input.maxHeight)) {
    errors.minHeight = 'Minimum Height can\'t be higher than Maximum Height'
  } else if (parseInt(input.minHeight) < 1) {
    errors.minHeight = 'Minimum Height can\'t be lower than 1 kg'
  };

  if (!input.maxHeight) {
    errors.maxHeight = 'Maximum Height is required'
  } else if (!/[0-9]+$/.test(input.maxHeight)) {
    errors.maxHeight = 'Only numbers are allowed'
  } else if (parseInt(input.maxHeight) < parseInt(input.minHeight)) {
    errors.maxHeight = 'Maximum Height can\'t be lower than Minimum Height'
  } else if (parseInt(input.maxHeight) < 1) {
    errors.maxHeight = 'Maximum Height can\'t be lower than 1 kg'
  };

  // Life Span validations
  if (!input.minLifeSpan) {
    errors.minLifeSpan = 'Minimun Life Span is required'
  } else if (!/[0-9]+$/.test(input.minLifeSpan)) {
    errors.minLifeSpan = 'Only numbers are allowed'
  } else if (parseInt(input.minLifeSpan) > parseInt(input.maxLifeSpan)) {
    errors.minLifeSpan = 'Minimum Life Span can\'t be higher than Maximum Life Span'
  } else if (parseInt(input.minLifeSpan) < 1) {
    errors.minLifeSpan = 'Maximum Height can\'t be lower than 1 kg'
  };

  if (!input.maxLifeSpan) {
    errors.maxLifeSpan = 'Maximum Life Span is required'
  } else if (!/[0-9]+$/.test(input.maxLifeSpan)) {
    errors.maxLifeSpan = 'Only numbers are allowed'
  } else if (parseInt(input.maxLifeSpan) < parseInt(input.minLifeSpan)) {
    errors.maxLifeSpan = 'Maximum Life Span can\'t be lower than Minimum Life Span'
  } else if (parseInt(input.maxLifeSpan) < 1) {
    errors.maxLifeSpan = 'Maximum Height can\'t be lower than 1 kg'
  };

  return errors;
}

export default validateForm;

/* name: '',
minWeight: '',
maxWeight: '',
minHeight: '',
maxHeight: '',
minLifeSpan: '',
maxLifeSpan: '',
temperaments */