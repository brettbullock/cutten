import * as React from 'react';

// type for nested totalPerDay state
interface IStateTotalPerDay {
  totalPerDay: number | null;
}

// type for userName
interface IStateUserName {
  name: string | null;
}

// type for messageCount
interface IStateMessageCount {
  messageCount: number | null;
}

// type for kCount
interface IStateKCount {
  kCount: number | null;
}

// type for userPerDay object 
interface IStateUserPerDay {
  name: IStateUserName
  messageCount: IStateMessageCount
  kCount: IStateKCount
}

// type for Stats props
interface IStatisticsProps {
  file: File | null;
  date: String | null;
  showStats: boolean;
  data: { 
    analyze: {
      totalPerDay: IStateTotalPerDay
      usersPerDay: [IStateUserPerDay] 
    }
  } | null;

}

class Statistics extends React.Component<IStatisticsProps> {
  constructor(props: IStatisticsProps) {
    super(props)
  }

  render() {
    const {
      file,
      date,
      showStats,
      data
    } = this.props

    return (
      <div>
        <div>
          {file &&
          <h2>{file.name} ready for upload.</h2>}
        </div>
        <div>
          {showStats && data &&
            <div>
              <h2>{data.analyze.totalPerDay} messages sent on {date}</h2>
              {/* {data.analyze.usersPerDay.map((user: IStateUserPerDay, index: number) => (
                <h3 key={index}>{user.name} sent {user.messageCount} in total, with a K count of {user.kCount}</h3>  
              ))} */}
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Statistics