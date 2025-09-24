import { CSSProperties, useState } from 'react';
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
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';

type articlePropsState = {
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({ setArticleState }: articlePropsState) => {
	const [formsState, setFormState] = useState(defaultArticleState);
	const [isOpen, setIsOpen] = useState(false);
	const openAside = () => setIsOpen(!isOpen);
	const handleFieldChange =
		<K extends keyof ArticleStateType>(field: K) =>
		(value: ArticleStateType[K]) => {
			setFormState((prev) => ({ ...prev, [field]: value }));
		};

	const applyProperties = (ev: React.FormEvent) => {
		ev.preventDefault();
		setArticleState(formsState);
	};

	const formReset = (ev: React.FormEvent) => {
		ev.preventDefault();
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={openAside} />
			<aside
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
				style={
					{
						'--font-family': formsState.fontFamilyOption.value,
						'--font-size': formsState.fontSizeOption.value,
						'--font-color': formsState.fontColor.value,
						'--container-width': formsState.contentWidth.value,
						'--bg-color': formsState.backgroundColor.value,
					} as CSSProperties
				}>
				<form
					className={styles.form}
					onSubmit={applyProperties}
					onReset={formReset}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						selected={formsState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleFieldChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontSizeOptions'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formsState.fontSizeOption}
						onChange={handleFieldChange('fontSizeOption')}
					/>
					<Select
						selected={formsState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleFieldChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={formsState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleFieldChange('backgroundColor')}
					/>
					<Select
						selected={formsState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleFieldChange('contentWidth')}
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
