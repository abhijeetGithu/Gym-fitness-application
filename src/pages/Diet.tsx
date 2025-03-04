import React from 'react';
import { Apple, Coffee, Sun, Moon } from 'lucide-react';

const Diet = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Diet & Nutrition Guide</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <Sun className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold">Morning Diet</h2>
          </div>
          <div className="space-y-4">
            <MealItem
              time="7:00 AM"
              meal="Pre-workout"
              items={['1 banana', '1 cup black coffee']}
              icon={Coffee}
            />
            <MealItem
              time="9:00 AM"
              meal="Breakfast"
              items={['Oatmeal with fruits', 'Greek yogurt', '2 boiled eggs']}
              icon={Apple}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <Moon className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold">Evening Diet</h2>
          </div>
          <div className="space-y-4">
            <MealItem
              time="5:00 PM"
              meal="Pre-workout"
              items={['1 apple', 'Protein shake']}
              icon={Coffee}
            />
            <MealItem
              time="8:00 PM"
              meal="Dinner"
              items={['Grilled chicken breast', 'Brown rice', 'Steamed vegetables']}
              icon={Apple}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Supplement Recommendations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <SupplementCard
            name="Whey Protein"
            description="Take 1 scoop post-workout"
            timing="Post workout or morning"
          />
          <SupplementCard
            name="Creatine Monohydrate"
            description="5g daily"
            timing="Any time of day"
          />
        </div>
      </div>
    </div>
  );
};

const MealItem = ({ time, meal, items, icon: Icon }) => (
  <div className="border-t pt-4">
    <div className="flex items-center mb-2">
      <Icon className="w-4 h-4 text-gray-500 mr-2" />
      <span className="font-semibold">{time} - {meal}</span>
    </div>
    <ul className="list-disc list-inside text-gray-600 ml-6">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const SupplementCard = ({ name, description, timing }) => (
  <div className="border p-4 rounded-lg">
    <h3 className="font-semibold mb-2">{name}</h3>
    <p className="text-gray-600">{description}</p>
    <p className="text-sm text-gray-500 mt-2">Best timing: {timing}</p>
  </div>
);

export default Diet;