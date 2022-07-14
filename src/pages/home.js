import { DashboardLayout } from '../components/Layout';
import "../components/TopBar.css";
const HomePage = () => {
	return (
		<DashboardLayout>
			<div className="TopBar">
				<div className="container">
					<div id="top-nav" className="d-flex justify-content-between">
						<a href="/leads.php?siteid=444">Lead Central
						</a>
						<a href="/url_tracking.php?siteid=444">Tracking Station
						</a>
						<a href="/cms.php?siteid=444">Content
						</a>
						<a href="/Jobs/index.php?siteid=444">Jobs
						</a>
						<a href="/Jobs/photo_gallery.php?siteid=444">Gallery
						</a>
						<a href="/Jobs/before_after.php?siteid=444">Before &amp; After
						</a>
						<a href="/Reviews/index.php?siteid=444">Reviews
						</a>
					</div>
				</div>
			</div>
			<div className="module-section">
				<div className="container">
					<div className="module-row">
						<div className="module-list">
							<a href="/leads.php?siteid=444&amp;domain=americanbestit.com"><img src="https://jupiterplatform.com/images/icons/lead-central.png" border="0" alt="Lead Central" /></a> <br /> <a href="/leads.php?siteid=444&amp;domain=americanbestit.com">Lead Central</a>
						</div>
						<div className="module-list">
							<a href="/url_tracking.php?siteid=444&amp;domain=americanbestit.com"><img src="https://jupiterplatform.com/images/icons/Tracking-Station.png" border="0" alt="Tracking Station" /></a> <br /> <a href="/url_tracking.php?siteid=444&amp;domain=americanbestit.com">Tracking Station</a>
						</div>
						<div className="module-list">
							<a href="/cms.php?siteid=444&amp;domain=americanbestit.com"><img src="https://jupiterplatform.com/images/icons/Site-Content.png" border="0" alt="Content" /></a> <br /> <a href="/cms.php?siteid=444&amp;domain=americanbestit.com">Content</a>
						</div>
						<div className="module-list">
							<a href="/Jobs/index.php?siteid=444&amp;domain=americanbestit.com"><img src="https://jupiterplatform.com/images/icons/Completed-Jobs.png" border="0" alt="Jobs" /></a> <br /> <a href="/Jobs/index.php?siteid=444&amp;domain=americanbestit.com">Jobs</a>
						</div>
						<div className="module-list">
							<a href="/Jobs/photo_gallery.php?siteid=444&amp;domain=americanbestit.com"><img src="https://jupiterplatform.com/images/icons/photo-gallery.png" border="0" alt="Gallery" /></a> <br /> <a href="/Jobs/photo_gallery.php?siteid=444&amp;domain=americanbestit.com">Gallery</a>
						</div>
						<div className="module-list">
							<a href="/Jobs/before_after.php?siteid=444&amp;domain=americanbestit.com"><img src="https://jupiterplatform.com/images/icons/before-after.png" border="0" alt="Before &amp; After" /></a> <br /> <a href="/Jobs/before_after.php?siteid=444&amp;domain=americanbestit.com">Before &amp; After</a>
						</div>
						<div className="module-list">
							<a href="/Reviews/index.php?siteid=444&amp;domain=americanbestit.com"><img src="https://jupiterplatform.com/images/icons/Review-Central-2.png" border="0" alt="Reviews" /></a> <br /> <a href="/Reviews/index.php?siteid=444&amp;domain=americanbestit.com">Reviews</a>
						</div>
						<div className="module-list">
							<a href="/site_token_list.php?siteid=444&amp;domain=americanbestit.com"><img src="https://jupiterplatform.com/images/icons/Site-Tokens.png" border="0" alt="Site Tokens" /></a> <br /> <a href="/site_token_list.php?siteid=444&amp;domain=americanbestit.com">Site Tokens</a>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	)
}

export default HomePage;