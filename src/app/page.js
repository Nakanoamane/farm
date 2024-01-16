'use client';

import { useState, useEffect } from 'react';
import Home from './_components/home';
import Fields from './_components/fields';
import { itemsDefault, fieldsDefault, achievementsDefault, updateFields } from '../lib/state';
import Shops from './_components/shops';

export default function Index() {
  const [items, setItems] = useState(itemsDefault);
  const [selectedItem, setSelectedItem] = useState('hand');
  const [fields, setFields] = useState(fieldsDefault);
  const [logs, setLogs] = useState([]);
  const [money, setMoney] = useState(0);
  const [score, setScore] = useState(0);
  const [achievements, setachievements] = useState(achievementsDefault);

  const [time, setTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time + 1);
      if(time > 0 && time % 5 === 0) {
        setFields(updateFields(time, fields));
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <main>
      <Home
        items={items}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        logs={logs}
        money={money}
        score={score}
        />

      <Fields
        items={items}
        setItems={setItems}
        selectedItem={selectedItem}
        fields={fields}
        setFields={setFields}
        time={time}
        setLogs={setLogs}
        setScore={setScore}
        />

      <Shops
        achievements={achievements}
        />
    </main>
  )
}
