import { CSSProperties, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';

type articlePropsState = {
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({ setArticleState }: articlePropsState) => {
	const [formsState, setFormState] = useState(defaultArticleState);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const asideRef = useRef(null);

	const toggleAsideMenu = () => setIsMenuOpen(!isMenuOpen);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		onChange: () => setIsMenuOpen(false),
		rootRef: asideRef,
	});

	const updateFieldValue =
		<K extends keyof ArticleStateType>(field: K) =>
		(value: ArticleStateType[K]) => {
			setFormState((prev) => ({ ...prev, [field]: value }));
		};

	const submitForm = (ev: React.FormEvent) => {
		ev.preventDefault();
		setArticleState(formsState);
	};

	const resetFormFields = (ev: React.FormEvent) => {
		ev.preventDefault();
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleAsideMenu} />
			<aside
				className={`${styles.container} ${
					isMenuOpen ? styles.container_open : ''
				}`}
				style={
					{
						'--font-family': formsState.fontFamilyOption.value,
						'--font-size': formsState.fontSizeOption.value,
						'--font-color': formsState.fontColor.value,
						'--container-width': formsState.contentWidth.value,
						'--bg-color': formsState.backgroundColor.value,
					} as CSSProperties
				}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={submitForm}
					onReset={resetFormFields}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						selected={formsState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={updateFieldValue('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontSizeOptions'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formsState.fontSizeOption}
						onChange={updateFieldValue('fontSizeOption')}
					/>
					<Select
						selected={formsState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={updateFieldValue('fontColor')}
					/>
					<Separator />
					<Select
						selected={formsState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={updateFieldValue('backgroundColor')}
					/>
					<Select
						selected={formsState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={updateFieldValue('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
