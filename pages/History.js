import {useAtom} from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import { Card, Button, ListGroup } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';

export default function History(){
    const [searchHistory,setSearchHistory]=useAtom(searchHistoryAtom);
    const router=useRouter();

    if(!searchHistory) return null;

    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    function historyClicked(e,index){
        e.preventDefault();
        router.push(`/artwork?${searchHistory[index]}`);       
    }

    async function removeHistoryClicked(e,index){
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(await removeFromHistory(searchHistory[index]));
        // setSearchHistory(current => {
        //     let x = [...current];
        //     x.splice(index, 1)
        //     return x;
        // });
    }

    return(
        <>
            <br/>
            {parsedHistory.length ? (
                <ListGroup>
                    {parsedHistory.map((historyItem,index)=>(
                        <ListGroup.Item 
                            key={index} 
                            onClick={e=>historyClicked(e,index)}
                            className={styles.historyListItem}
                        >
                            {Object.keys(historyItem).map(key => (
                                <>
                                    {key}: <strong>{historyItem[key]}</strong>
                                    &nbsp;
                                </>
                            ))}
                            <Button 
                                className="float-end" 
                                variant="danger" 
                                size="sm" 
                                onClick={e => removeHistoryClicked(e, index)}
                            >
                                &times;
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ):(
                <Card>         
                    <Card.Body><h4>Nothing Here</h4>Try searching for something else.</Card.Body>
                </Card>
                )               
            }
        </>
    )
  
}
