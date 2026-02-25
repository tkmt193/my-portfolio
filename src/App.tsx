import "./App.css";
import Loading from "./components/Loading/Loading";
import { useState, useEffect, useRef, useMemo } from "react";
import About from "./sections/About/About";
import Portfolio from "./sections/Portfolio/Portfolio";
import Contact from "./sections/Contact/Contact";
import type { SectionId, SectionRefs } from "./type/sections";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Introduce from "./sections/Introduce/Introduce";

function App() {
	const [active, setActive] = useState(false);
	const [homeActive, setHomeActive] = useState(false);
	const [currentSection, setCurrentSection] = useState<SectionId>("home");
	const isScrollingRef = useRef(false);
	const homeRef = useRef<HTMLElement>(null);
	const aboutRef = useRef<HTMLElement>(null);
	const portfolioRef = useRef<HTMLElement>(null);
	const contactRef = useRef<HTMLElement>(null);
	const sectionRefs: SectionRefs = useMemo(
		() => ({
			home: homeRef,
			about: aboutRef,
			portfolio: portfolioRef,
			contact: contactRef,
		}),
		[],
	);

	/* ヘッダーからセクションの切り替え */
	const scrollToSection = (id: SectionId) => {
		const target = sectionRefs[id].current;
		if (target) {
			isScrollingRef.current = true;
			setCurrentSection(id);

			const offset = 80;
			const elementPosition = target.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});

			const handleScrollEnd = () => {
				isScrollingRef.current = false;
				window.removeEventListener("scrollend", handleScrollEnd);
			};

			window.addEventListener("scrollend", handleScrollEnd);
		}
	};

	/* ローディング画面の表示 */
	useEffect(() => {
		document.body.style.overflow = "hidden";

		const showTimer = setTimeout(() => {
			setActive(true);

			setTimeout(() => {
				document.body.style.overflow = "auto";
				setHomeActive(true);
			}, 800);
		}, 3000);

		return () => {
			clearTimeout(showTimer);
			document.body.style.overflow = "auto";
		};
	}, []);

	/* どのセクションにいるか取得してヘッダーメニューに渡す */
	useEffect(() => {
		const observerOptions = {
			root: null,
			rootMargin: "-40% 0px -40% 0px",
			threshold: 0,
		};

		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			if (isScrollingRef.current) return;
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const sectionId = Object.keys(sectionRefs).find(
						(key) => sectionRefs[key as SectionId].current === entry.target,
					) as SectionId;

					if (sectionId) {
						setCurrentSection(sectionId);
					}
				}
			});
		};

		const observer = new IntersectionObserver(
			observerCallback,
			observerOptions,
		);

		Object.values(sectionRefs).forEach((ref) => {
			if (ref.current) observer.observe(ref.current);
		});

		return () => observer.disconnect();
	}, [sectionRefs]);

	return (
		<>
			<Loading active={active} />
			<Header
				currentSection={currentSection}
				scrollToSection={scrollToSection}
			/>
			<div className="example">
				<Introduce
					active={homeActive}
					ref={sectionRefs.home}
					scrollToSection={scrollToSection}
				/>
				<About ref={sectionRefs.about} />
				<Portfolio ref={sectionRefs.portfolio} />
				<Contact ref={sectionRefs.contact} />
			</div>
			<Footer />
		</>
	);
}

export default App;
