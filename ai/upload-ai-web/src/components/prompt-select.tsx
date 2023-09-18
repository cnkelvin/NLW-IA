import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "./ui/select";
import { useState, useEffect} from 'react';

interface Prompt {
	id: string
	titulo: string
	template: string
}

interface PromptSelectProps {
	onPromptSelect: (template: string) => void
}

export function PromptSelect(props: PromptSelectProps) {
	const [prompts, setPrompts] = useState<Prompt[] | null>(null)

	useEffect(() => {
		api.get('/prompts').then(response => {
			setPrompts(response.data)
		})
	}, [])

	function handlePromptSelected(promptId: string) {
		const selectedPrompt = prompts?.find(prompt.id == promptId)

		if(!selectedPrompt) {
			return
		}

		props.onPromptSelected(selectedPrompt.template)
	}

	return (
			<Select onValueChange={handlePromptSelected}>
   			<SelectTrigger>
   				<SelectValue placeholder="Selecione um prompt..."/>
   			</SelectTrigger>
   			<SelectContent>
   				{prompts?.map(prompt => {
   					return (
   						<SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>)
   				})}
   			</SelectContent>
   		</Select>
		)
}