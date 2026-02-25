import { useState } from "react";
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
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navItems: { id: SectionId; label: string }[] = [
		{ id: "home", label: "Home" },
		{ id: "about", label: "About" },
		{ id: "portfolio", label: "Portfolio" },
		{ id: "contact", label: "Contact" },
	];

	const handleNavClick = (id: SectionId) => {
		scrollToSection(id);
		setIsMenuOpen(false);
	};

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<button
					type="button"
					className={styles.logo}
					onClick={() => handleNavClick("home")}
				>
					IKUMI'S PORTFOLIO
				</button>

				{/* ハンバーガーボタン: PCでは display:none で完全に隠します */}
				<button
					type="button"
					className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-label="メニュー開閉"
				>
					<span></span>
					<span></span>
					<span></span>
				</button>

				{/* isMenuOpenの時だけ navOpen クラスを付与 */}
				<nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
					{navItems.map((item) => (
						<button
							key={item.id}
							type="button"
							className={`${styles.navButton} ${
								currentSection === item.id ? styles.active : ""
							}`}
							onClick={() => handleNavClick(item.id)}
						>
							{item.label}
						</button>
					))}
				</nav>
			</div>
		</header>
	);
}
