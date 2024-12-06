import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
import { AIchatSession } from '/service_api/AIModel.js';
import { toast } from 'sonner';

const PROMPT = 'position title: {positionTitle} , Give me 5-7 bullet points for my experience in resume. Return response in JSON format with key "bulletPoints" as array';

function RichTextEditor({onRichTextEditorChange, index}) {
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  const [value, setValue] = useState('');
  
  const [loading, setLoading] = useState(false);

  const formatBulletPoints = (bulletPoints) => {
    if (Array.isArray(bulletPoints)) {
      return `<ul>${bulletPoints.map(point => `<li>${point}</li>`).join('')}</ul>`;
    }
    return '<ul><li>No bullet points available</li></ul>';
  };

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo.experience[index].title) {
      toast('Please add position title first');
      setLoading(false);
      return;
    }

    try {
      const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
      const result = await AIchatSession.sendMessage(prompt);
      const response = await result.response.text();
      
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(response);
        const formattedText = formatBulletPoints(parsedResponse.bulletPoints);
        setValue(formattedText);
      } catch (error) {
        toast.error('Invalid JSON response from AI');
        console.error('JSON Parsing Error:', error);
      }
    } catch (error) {
      toast.error('Failed to generate content');
      console.error('AI Generation Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summary</label>
        <Button 
          className='flex gap-2 border-primary text-primary' 
          variant='outline' 
          size='sm' 
          onClick={GenerateSummeryFromAI}
          disabled={loading}
   
        >
          {loading ? <LoaderCircle className='animate-spin'/> : <Brain className='h-4 w-4' />}
          Generate From AI
        </Button>
      </div>
      <EditorProvider>
        <Editor 
          value={value} 
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold/>
            <BtnItalic/>
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />       
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;