import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import global_api from '/service_api/global_api.js';
import { toast } from 'sonner';
import { LoaderIcon } from 'lucide-react';
import { AIchatSession } from '/service_api/AIModel.js';

const prompt = `Generate 3 different professional summaries for a {jobTitle} position in JSON format. 
Format the response as:
{
  "summaries": [
    {
      "ExperienceLevel": "Fresher",
      "Summary": "..."
    },
    {
      "ExperienceLevel": "Mid-Level",
      "Summary": "..."
    },
    {
      "ExperienceLevel": "Experienced",
      "Summary": "..."
    }
  ]
}`;

function Summery() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState(resumeInfo?.summery || '');
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [loadingAI, setLoadingAI] = useState(false);
    const [aiGeneratedSummeryList, setaiGeneratedSummeryList] = useState([]);
    const [selectedSummary, setSelectedSummary] = useState(null);

    useEffect(() => {

        if (resumeInfo.summery !== summery) {
            setResumeInfo({
                ...resumeInfo,
                summery: summery
            });
        }
    }, [summery, resumeInfo, setResumeInfo]);

    const generateSummeryFromAI = async () => {
        if (!resumeInfo?.jobTitle) {
            toast.error('Please set a job title first');
            return;
        }

        setLoadingAI(true);
        try {
            const PROMPT = prompt.replace('{jobTitle}', resumeInfo.jobTitle);
            const result = await AIchatSession.sendMessage(PROMPT);
            const responseText = await result.response.text();
            
            try {
                const parsedResult = JSON.parse(responseText);
                if (Array.isArray(parsedResult.summaries)) {
                    setaiGeneratedSummeryList(parsedResult.summaries);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (parseError) {
                console.error('Parsing Error:', parseError);
                toast.error('Failed to parse AI response');
            }
        } catch (error) {
            console.error('AI Error:', error);
            toast.error('Failed to generate summaries');
        } finally {
            setLoadingAI(false);
        }
    };

    const handleSummarySelection = (summary, index) => {
        setSelectedSummary(index);
        setSummery(summary.Summary);
    };

    const onSave = async (e) => {
        e.preventDefault();
        if (!summery?.trim()) {
            toast.error('Please add a summary');
            return;
        }

        setLoading(true);
        try {
            await global_api.UpdateResumeDetail(params.resumeId, {
                data: {
                    summery: summery
                }
            });
            toast.success('Summary updated successfully');
        } catch (error) {
            toast.error('Failed to update summary');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 mt-10">
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4'>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className='font-bold text-lg'>Summary</h2>
                        <p className="text-gray-600">Add a professional summary for your job</p>
                    </div>
                    <Button
                        onClick={generateSummeryFromAI}
                        variant='outline'
                        size='sm'
                        className='border-primary text-primary hover:bg-primary/10'
                        disabled={loadingAI || !resumeInfo?.jobTitle}>
                        {loadingAI ? <LoaderIcon className='animate-spin' /> : 'Generate From AI'}
                    </Button>
                </div>



                <form onSubmit={onSave} className="space-y-4">
                    <Textarea
                        className='min-h-[120px] resize-y'
                        value={summery}
                        placeholder='Write your summary here'
                        onChange={(e) => setSummery(e.target.value)}
                    />
                    <div className='flex justify-end'>
                        <Button disabled={loading} type="submit">
                            {loading ? <LoaderIcon className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
                <div>
                {aiGeneratedSummeryList.length > 0 && (
                    <div className="mt-4 mb-4">
                        <h3 className="font-bold mb-2">Select a Summary:</h3>
                        <div className="space-y-3">
                            {aiGeneratedSummeryList.map((summary, index) => (
                                <div
                                    key={index}
                                    className={`p-3 border rounded-lg transition-all cursor-pointer hover:border-primary/50 ${
                                        selectedSummary === index ? 'border-primary bg-primary/5' : 'border-gray-200'
                                    }`}
                                    onClick={() => handleSummarySelection(summary, index)}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                                            {summary.ExperienceLevel}
                                        </span>
                                    </div>
                                    <p className="text-gray-700">{summary.Summary}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                </div>

            </div>
        </div>
    );
}

export default Summery;