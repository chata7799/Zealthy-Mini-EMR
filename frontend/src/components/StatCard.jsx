function StatCard({

    title,

    value,

    icon,

    color

}) {

    return (

        <div className="col-lg-4">

            <div
                className="card border-0 shadow-sm rounded-4">

                <div className="card-body d-flex justify-content-between align-items-center">

                    <div>

                        <small
                            className="text-muted">

                            {title}

                        </small>

                        <h2
                            className="fw-bold mt-2">

                            {value}

                        </h2>

                    </div>

                    <div
                        style={{
                            fontSize:40,
                            color:color
                        }}
                    >

                        {icon}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default StatCard;