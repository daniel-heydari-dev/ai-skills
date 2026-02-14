import { useCallback } from "react";
import { Link } from "react-router-dom";
import type { Skill } from "../data/catalog";
import { categories } from "../data/catalog";
import styles from "./SkillCard.module.css";

interface SkillCardProps {
  skill: Skill;
  index?: number;
}

export function SkillCard({ skill, index = 0 }: SkillCardProps) {
  const category = categories[skill.category];

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
      e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
    },
    [],
  );

  return (
    <Link
      to={`/${skill.category}/${skill.id}`}
      className={styles.card}
      style={
        {
          animationDelay: `${index * 60}ms`,
          "--card-border": category.color,
        } as React.CSSProperties
      }
      onMouseMove={handleMouseMove}
    >
      <div className={styles.glowBorder} aria-hidden="true" />
      <div className={styles.spotlight} aria-hidden="true" />
      <div className={styles.cardInner}>
        <div className={styles.header}>
          <span className={styles.icon}>{category.icon}</span>
          <span className={styles.category} style={{ color: category.color }}>
            {category.name}
          </span>
          <span className={styles.arrow}>→</span>
        </div>
        <h3 className={styles.name}>{skill.name}</h3>
        <p className={styles.description}>{skill.description}</p>
        <div className={styles.tags}>
          {skill.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
