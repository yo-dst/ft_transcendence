import { c as create_ssr_component, b as subscribe, d as add_attribute, e as escape, f as each } from './index2-63bef90b.js';
import { u as user } from './user-91f221f3.js';
import './index-63b88ed9.js';

const css = {
  code: ".user.svelte-1yhyupc.svelte-1yhyupc{display:flex;flex-direction:column;align-items:center;gap:1rem}.user.svelte-1yhyupc img.svelte-1yhyupc{width:50%;height:auto;border-radius:50%;object-fit:cover;aspect-ratio:1/1}.user-stats.svelte-1yhyupc.svelte-1yhyupc{display:flex;flex-direction:column;align-items:center}h3.svelte-1yhyupc.svelte-1yhyupc{margin-bottom:1rem;font-weight:normal;margin-left:0.5rem}.table-match-history.svelte-1yhyupc.svelte-1yhyupc{padding:0.5rem 1rem 0rem 0.5rem;border-radius:0 0 5px 5px}figure.svelte-1yhyupc.svelte-1yhyupc{margin-bottom:-0.5rem}thead.svelte-1yhyupc.svelte-1yhyupc{border:none}.result-cell.svelte-1yhyupc.svelte-1yhyupc{display:flex;align-items:center}.load-more-button.svelte-1yhyupc.svelte-1yhyupc{margin-top:-0.5rem;width:auto;border-radius:50%;display:flex;justify-content:center;align-items:center;padding:0.05rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  let index = 0;
  let matches = [];
  $$result.css.add(css);
  $$unsubscribe_user();
  return `<section><div class="${"user svelte-1yhyupc"}"><img${add_attribute("src", $user.profile.avatar.url, 0)} alt="${"profile"}" class="${"svelte-1yhyupc"}">
		<div class="${"user-stats svelte-1yhyupc"}"><span>${escape($user.profile.username)}</span>
			<div><span style="${"color: var(--ins-color);;"}">${escape($user.profile.wins)}</span>
				/
				<span style="${"color: var(--color);"}">0</span>
				/
				<span style="${"color: var(--del-color);;"}">${escape($user.profile.losses)}</span></div></div></div></section>

<section><div class="${"table-match-history bg-light-dark svelte-1yhyupc"}"><h3 class="${"svelte-1yhyupc"}">Match history</h3>
		<figure style="${"overflow: hidden;"}" class="${"svelte-1yhyupc"}"><table><thead class="${"svelte-1yhyupc"}"><tr><th>Opponent</th>
						<th>Result</th>
						<th>Date</th></tr></thead>
				<tbody>${each(matches, (match) => {
    return `<tr><td class="${"opponent-cell"}"><span>${escape(match.opponentProfile.username)}</span></td>
							<td class="${"result-cell svelte-1yhyupc"}"><div style="${"display: flex; flex-direction: column; min-width: 1.5em"}"><span>${escape(match.userScore)}</span>
									<span>${escape(match.opponentScore)}</span></div>
								${match.result == "won" ? `<iconify-icon icon="${"material-symbols:check-small-rounded"}" style="${"color: var(--ins-color); font-size: 2rem;"}"></iconify-icon>` : `${match.result == "lost" ? `<iconify-icon icon="${"ic:round-close"}" style="${"color: var(--del-color); font-size: 1.5rem; margin-left: 0.3rem;"}"></iconify-icon>` : `<iconify-icon icon="${"ic:round-minus"}" style="${"color: var(--color); font-size: 1.5rem; margin-left: 0.3rem;"}"></iconify-icon>`}`}</td>
							<td><span style="${"white-space: nowrap;"}">${escape(new Date(match.createdAt).toDateString())}
									${escape(new Date(new Date(match.createdAt).getTime() + 72e5).toLocaleTimeString("fr-MC"))}
								</span></td>
						</tr>`;
  })}</tbody></table></figure>
		${index === matches.length ? `<div style="${"display: flex; justify-content: center;"}"><button class="${"secondary load-more-button svelte-1yhyupc"}"><iconify-icon icon="${"ic:round-plus"}" style="${"font-size: 1rem;"}"></iconify-icon></button></div>` : ``}</div>
</section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-ac6248cb.js.map
