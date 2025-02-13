"use client";

import styles from "./page.module.scss";
import Dropdown from "./components/DropDown";
import { useState, useCallback } from "react";
import {
  BookOpen,
  FlaskConical,
  Palette,
  Dumbbell,
  Gamepad2,
  Heart,
  XCircle,
} from "lucide-react";

type Option = {
  title: string;
  icon: React.FC<{ size?: number }>;
};

export default function Home() {
  const initialOptions: Option[] = [
    { title: "Education", icon: BookOpen },
    { title: "Science", icon: FlaskConical },
    { title: "Art", icon: Palette },
    { title: "Sport", icon: Dumbbell },
    { title: "Game", icon: Gamepad2 },
    { title: "Health", icon: Heart },
  ];

  const [allOptions, setAllOptions] = useState<Option[]>(initialOptions);
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);

  const removeItem = useCallback((item: Option) => {
    setSelectedItems((prev) => prev.filter((v) => v.title !== item.title));
  }, []);

  const handleNewItem = (newItem: Option) => {
    setAllOptions((prev) => [...prev, newItem]);
  };

  return (
    <div className={styles["page"]}>
      <div className={styles["page__dropdown-container"]}>
        <Dropdown
          selectedItems={selectedItems}
          options={allOptions}
          onChange={setSelectedItems}
          onNewItem={handleNewItem}
          placeholder="Select an option..."
        />

        {/* Selected Items */}
        <div className={styles["page__selected-items"]}>
          {selectedItems.map((item) => (
            <div key={item.title} className={styles["page__selected-item"]}>
              <item.icon size={16} />
              <span>{item.title}</span>
              <XCircle
                size={16}
                onClick={() => removeItem(item)}
                className={styles["page__remove-icon"]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
