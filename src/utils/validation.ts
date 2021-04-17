const validation = (e: any, type: string, rule: any) => {
  let invalid = true;
  if (type === 'email') {
    invalid = e.target.validity.typeMismatch;
  } else {
    invalid = e.target.value.length < 6;
  }
  if (invalid) {
    e.target.setCustomValidity(rule);
  } else e.target.setCustomValidity('');
};
export default validation;
