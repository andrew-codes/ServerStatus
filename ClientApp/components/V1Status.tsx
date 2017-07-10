import * as React from 'react';
import 'isomorphic-fetch';

import { ZabbixStatusState, ZabbixStatus } from './ZabbixStatus';
import { ContinuumStatusState, ContinuumStatus } from './ContinuumStatus';


interface V1StatusResponse {
    item1: string;
    item2: ContinuumStatusState[];
    item3: ZabbixStatusState[];
    loading: boolean;
}

export class V1Status extends React.Component<{}, V1StatusResponse> {
    constructor() {
        super();
        this.state = { item1: "",
                      item2: [],
                      item3: [],
                       loading: true };

        fetch('api/status')
            .then(response => response.json() as Promise<V1StatusResponse>)
            .then(data => {
                this.setState({ item1: (new Date(data.item1)).toLocaleTimeString(), item2: data.item2, item3: data.item3, loading: false });
            });
    }

    public render() {
          let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : V1Status.renderStatus(this.state);

        return <span>
            <h1 className="V1SS">VersionOne Server Status</h1>
            { contents }
        </span>;
    }

    private static renderStatus(status: V1StatusResponse) {
        return <span>
            <div className="asof">as of {status.item1}</div>
            <div id="data">
            <ContinuumStatus status={status.item2} />
            <div id="separator">&nbsp;&nbsp;</div>
            <ZabbixStatus status={status.item3} />
            </div>
        </span>;
    }
}