export default function VideoSkeleton() {
    return (
        <>
            <div className="video__skeleton">
                <div className="skeleton__thumb">
                    <div className="skeleton__skeleton"></div>
                </div>
                <div className="skeleton__info">
                    <div className="skeleton__title">
                        <div></div>
                    </div>
                    <div className="skeleton__info">
                        <span className="author">
                            <div></div>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
