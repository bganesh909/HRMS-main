import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProjectData } from '../../../api/services';
import { UserRound } from 'lucide-react';
import { manageProjectMyTeamView } from '../../../api/services';
import { ToastContainer, toast } from 'react-toastify';
function ManageProject() {
  const [project, setProject] = useState({});
  let params = useParams();
  const fetchDetails = async () => {
    const data = await fetchProjectData(params.projectId);
    setProject({ ...data });
  };
  const errorMessageHandler = (callback,message)=>{
    const notify = () => toast(message);
  }
  const successMessageHandler = (callback,message)=>{
    callback(message)
  }
  const teamData = async (id) => {
    // const status = await manageProjectMyTeamView(id);
    successMessageHandler(notify,"Fetching Team View")
  };
  const notify = (message) => toast(message);
  useEffect(() => {
    if (params.projectId) {
      console.log(params.projectId);
      fetchDetails();
    }
  }, []);

  if (Object.keys(project).length !== 0) {
    return (
      <div className="management-container">
        <button>Add Team</button>
        <button>Add Members</button>
        <div className="card-p">
          <div className="project-detail ">
            <div className="rpr">Project Name</div>
            <div className="rpr color-grey">{project.project_name}</div>
          </div>
          {/*  */}
          <div className="project-detail">
            <div className="rpr">Total Teams</div>
            <div className="rpr color-grey">{project.teams.length}</div>
          </div>
          <div className="project-detail">
            <div className="rpr">Project Head</div>
            <div className="rpr color-grey">
              {project.project_leader && project.project_leader.first_name}
            </div>
          </div>

          <section className="team-detail">
            <h3 className="rpr">Teams</h3>
            {project.teams.length > 0 &&
              project.teams.map((team, index) => {
                return (
                  <div key={index} className="rpr team-card">
                    <div className="osns">{team.name}</div>

                    <div className="team-meta">
                      <UserRound />
                      <div>{team.total_members}</div>
                    </div>
                    <div className="team-actions text-center">
                      <button
                        className="rpr"
                        onClick={() => {
                          teamData();
                        }}
                      >
                        View Team
                      </button>
                    </div>
                  </div>
                );
              })}
          </section>
        </div>
        <ToastContainer />
      </div>
    );
  } else {
    return <div>No Project to display</div>;
  }
}

export default ManageProject;
