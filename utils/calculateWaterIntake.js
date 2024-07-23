export const calculateWaterIntake = ({ weight, weightUnit }) => {
    if (weightUnit === 'kg') {
      return weight * 0.033;  
    } else if (weightUnit === 'lb') {
      return weight * 0.5;  
    }
    return 0;
  };