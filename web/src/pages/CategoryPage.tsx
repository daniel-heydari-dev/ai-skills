import { useParams, Link } from "react-router-dom";
import { SkillCard } from "../components/SkillCard";
import {
  categories,
  getSkillsByCategory,
  type CategoryId,
} from "../data/catalog";
import styles from "./CategoryPage.module.css";

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const categoryId = category as CategoryId;

  if (!categoryId || !categories[categoryId]) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <span className={styles.notFoundIcon}>🔍</span>
          <h1 className={styles.title}>Category Not Found</h1>
          <p className={styles.description}>
            The category &ldquo;{category}&rdquo; does not exist.
          </p>
          <Link to="/" className={styles.backLink}>
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const cat = categories[categoryId];
  const skills = getSkillsByCategory(categoryId);

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Home</Link>
        <span className={styles.sep}>/</span>
        <span className={styles.current}>{cat.name}</span>
      </nav>

      <header className={styles.header}>
        <span className={styles.iconGlow} aria-hidden="true" />
        <span className={styles.icon}>{cat.icon}</span>
        <h1 className={styles.title}>{cat.name}</h1>
        <p className={styles.description}>{cat.description}</p>
        <span className={styles.count}>
          {skills.length} {skills.length === 1 ? "item" : "items"}
        </span>
      </header>

      <div className={styles.grid}>
        {skills.map((skill, i) => (
          <SkillCard key={skill.id} skill={skill} index={i} />
        ))}
      </div>
    </div>
  );
}
