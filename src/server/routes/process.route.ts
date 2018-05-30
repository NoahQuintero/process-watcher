import { Router, Request, Response } from 'express';
import { Message, MessageType } from '../classes';
import { nextTick } from 'q';


const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    console.log(`process ${process.pid} recieved request`);

    process.prependOnceListener('message', (response: Message) => {
        res.json(response.data);
    });

    const msg: Message = new Message(String(process.pid), MessageType.REQUEST_WORKERS );

    process.send(msg);

});

router.post('/', (req: Request, res: Response) => {
    console.log(`process ${process.pid} recieved request`);

    process.prependOnceListener('message', (response: Message) => {
        res.json('aaa');
    });

    const pid = req.body.pid;

    const msg: Message = new Message(String(process.pid), MessageType.REQUEST_SHUTDOWN, pid);

    process.send(msg);

});

export const ProcessRoute: Router = router;
