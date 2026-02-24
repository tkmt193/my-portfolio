import styles from "./Header.module.css";
import type { SectionId } from "../../type/sections";

interface HeaderProps {
	currentSection: SectionId;
	scrollToSection: (id: SectionId) => void;
}

export default function Header({
	currentSection,
	scrollToSection,
}: HeaderProps) {
	// ナビゲーション項目のリスト
	const navItems: { id: SectionId; label: string }[] = [
		{ id: "home", label: "Home" },
		{ id: "about", label: "About" },
		{ id: "portfolio", label: "Portfolio" },
		{ id: "contact", label: "Contact" },
	];

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<button
					type="button"
					className={styles.logo}
					onClick={() => scrollToSection("home")}
				>
					IKUMI'S PORTFOLIO
				</button>

				<nav className={styles.nav}>
					{navItems.map((item) => (
						<button
							key={item.id}
							type="button"
							className={`${styles.navButton} ${
								currentSection === item.id ? styles.active : ""
							}`}
							onClick={() => scrollToSection(item.id)}
						>
							{item.label}
						</button>
					))}
				</nav>
			</div>
		</header>
	);
}
