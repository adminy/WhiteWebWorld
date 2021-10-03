const randomlyTag = () => [
  <span class="tag is-danger is-light">Ads</span>,
  <span class="tag is-primary is-light">Educational</span>,
  <span class="tag is-info is-light">Entertainment</span>,
  '',
  '',
  ''
][Math.floor(Math.random() * 7)]


module.exports = ({ domains }) => (
  <div class="table-container">

    <table class='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
      <thead>
        <tr><th class='has-text-left'>Domain Name</th><th>Times Requested</th></tr>
      </thead>
      <tbody>
        {domains.map(({ _id, name, times, timestamp }) => (
          <tr title={timestamp} key={_id}>
            <td>{name} {randomlyTag()}</td><td>{times.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

)
