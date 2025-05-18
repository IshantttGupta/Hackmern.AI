import React, { useState } from 'react';

const PlannerPage = () => {
  const [formData, setFormData] = useState({
    age: '',
    goal: '',
    meals: '',
    gender: '',
    diet: '',
    weight: '',
    height: '',
    weightUnit: 'kg',
    heightUnit: 'cm',
    allergies: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    // You can POST to backend here
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-white p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-green-700 text-center">Personalize Your Meal Plan</h2>

        {[
          { name: 'age', label: 'Age', type: 'number' },
          { name: 'weight', label: 'Weight', type: 'number' },
          { name: 'height', label: 'Height', type: 'number' },
          { name: 'meals', label: 'Meals per Day', type: 'number' },
        ].map(({ name, label, type }) => (
          <div key={name}>
            <label className="block font-medium text-gray-700">{label}</label>
            <input
              name={name}
              type={type}
              value={(formData)[name]}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg border border-green-300"
              required={name !== 'weight' && name !== 'height'}
            />
          </div>
        ))}

        {[
          { name: 'goal', label: 'Goal', options: ['weight_loss', 'muscle_gain', 'maintenance'] },
          { name: 'gender', label: 'Gender', options: ['male', 'female'] },
          { name: 'diet', label: 'Diet Type', options: ['vegan', 'vegetarian', 'non_veg'] },
          { name: 'weightUnit', label: 'Weight Unit', options: ['kg', 'lb'] },
          { name: 'heightUnit', label: 'Height Unit', options: ['cm', 'in'] },
        ].map(({ name, label, options }) => (
          <div key={name}>
            <label className="block font-medium text-gray-700">{label}</label>
            <select
              name={name}
              value={(formData)[name]}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg border border-green-300"
              required
            >
              <option value="">--Select--</option>
              {options.map(opt => (
                <option key={opt} value={opt}>
                  {opt.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div>
          <label className="block font-medium text-gray-700">Allergies (optional)</label>
          <input
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-lg border border-green-300"
            placeholder="E.g., nuts, gluten..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PlannerPage;
