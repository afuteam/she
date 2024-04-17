// const Authorization = 'Bearer 37151261cbcf014c83950740c0e20a4ac0df7d4638ceec68a5ca7b4b54f9c4608368cba3529e25df10f35b47c7ed571cd5e02fe1720307c99ef70170a35267194ed9d1f808f6a1e19874934e3725609b5c5079f87458c0f57ad2313bb6fa29fcfdf19a6eb96e43b6a33810ae0355ebf2a2dcbf326c58cde1e6c5a163656731ac'

export async function GetRepoData() {
  const res = await fetch('http://localhost:1337/api/repos-plural');
  const data = await res.json();
  return data;
}

export async function UpdateRepoData(data: { data: { name: string; description: string; name_with_namespace: string; path: string; path_with_namespace: string; default_branch: string; }[]; }) {
  const response = await fetch('http://localhost:1337/api/repos-plural', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': Authorization
    },
    body: JSON.stringify(data)
  });
  return response.json();
}
